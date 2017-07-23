namespace Logistica.Web.Security
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    using System.IO;
    using System.IO.Compression;
    using System.Web;
    using System.Web.Security;
    using Logistica.Common;
    using Logistica.ViewModel;

    public static class AuthenticationFormsClient
    {
        /// <summary>
        /// Sets authentication cookie.
        /// </summary>
        /// <param name="userName">   . </param>
        /// <param name="rememberMe"> . </param>
        /// <param name="userData">   . </param>
        public static void SetAuthenticationCookie(string userName, bool rememberMe, UsuarioApp userData)
        {

            var responseBase = HttpContext.Current.Response;
            var cookie = FormsAuthentication.GetAuthCookie(userName, rememberMe);
            var ticket = FormsAuthentication.Decrypt(cookie.Value);
            //TODO: Modificar
            var jsonUserData = userData.SerializarToJson();
            var newTicket = new FormsAuthenticationTicket(ticket.Version, ticket.Name, ticket.IssueDate, ticket.Expiration,
                ticket.IsPersistent, jsonUserData, ticket.CookiePath);
            var encTicket = FormsAuthentication.Encrypt(newTicket);

            responseBase.Cookies.Add(new HttpCookie(userData.CookieMenuPlano)
            {
                Value = StringCompressor.CompressString(userData.MenuUsuario.SerializarToJson()),
                Expires = ticket.Expiration
            });
            cookie.Value = encTicket;
            cookie.HttpOnly = false;
            responseBase.Cookies.Add(cookie);
        }

        /// <summary>
        /// Gets user data.
        /// </summary>
        /// <param name="request"> . </param>
        /// <returns>
        /// The user data.
        /// </returns>
        public static UsuarioApp GetUsuario(HttpRequest request)
        {
            HttpCookie authCookie = request.Cookies[FormsAuthentication.FormsCookieName];
            if (authCookie != null)
            {

                FormsAuthenticationTicket authTicket = FormsAuthentication.Decrypt(authCookie.Value);
                //TODO: Modificar
                UsuarioApp userData =  authTicket.UserData.DeserializarToJson<UsuarioApp>();
                if (request.Cookies[userData.CookieMenuPlano] != null)
                {
                    userData.MenuUsuario = StringCompressor.DecompressString(request.Cookies[userData.CookieMenuPlano].Value).DeserializarToJson<IEnumerable<MenuViewModel>>();
                }
                if (userData.MenuUsuario == null)
                {
                    RemoveAuthenticationCookie();
                    return null;
                }
                return userData;
            }

            return null;
        }

        /// <summary>
        /// Removes the authentication cookie.
        /// </summary>
        public static void RemoveAuthenticationCookie()
        {
            FormsAuthentication.SignOut();
        }
    }
    internal static class StringCompressor
    {
        /// <summary>
        /// Compresses the string.
        /// </summary>
        /// <param name="text">The text.</param>
        /// <returns></returns>
        public static string CompressString(string text)
        {
            byte[] buffer = Encoding.UTF8.GetBytes(text);
            var memoryStream = new MemoryStream();
            using (var gZipStream = new GZipStream(memoryStream, CompressionMode.Compress, true))
            {
                gZipStream.Write(buffer, 0, buffer.Length);
            }

            memoryStream.Position = 0;

            var compressedData = new byte[memoryStream.Length];
            memoryStream.Read(compressedData, 0, compressedData.Length);

            var gZipBuffer = new byte[compressedData.Length + 4];
            Buffer.BlockCopy(compressedData, 0, gZipBuffer, 4, compressedData.Length);
            Buffer.BlockCopy(BitConverter.GetBytes(buffer.Length), 0, gZipBuffer, 0, 4);
            return Convert.ToBase64String(gZipBuffer);
        }

        /// <summary>
        /// Decompresses the string.
        /// </summary>
        /// <param name="compressedText">The compressed text.</param>
        /// <returns></returns>
        public static string DecompressString(string compressedText)
        {
            byte[] gZipBuffer = Convert.FromBase64String(compressedText);
            using (var memoryStream = new MemoryStream())
            {
                int dataLength = BitConverter.ToInt32(gZipBuffer, 0);
                memoryStream.Write(gZipBuffer, 4, gZipBuffer.Length - 4);

                var buffer = new byte[dataLength];

                memoryStream.Position = 0;
                using (var gZipStream = new GZipStream(memoryStream, CompressionMode.Decompress))
                {
                    gZipStream.Read(buffer, 0, buffer.Length);
                }

                return Encoding.UTF8.GetString(buffer);
            }
        }
    }
}
