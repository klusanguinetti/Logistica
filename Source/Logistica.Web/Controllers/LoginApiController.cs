using Logistica.Common;
using Logistica.IBusiness;
using Logistica.UnityInject;

namespace Logistica.Web.Controllers
{
    using System;
    using System.Web.Http;
    using Logistica.Web.Security;
    using Logistica.ViewModel;
    public class LoginApiController : BaseApiController
    {
        #region atributos   
        
        #endregion

        public LoginApiController()
        {

        }

        public string DoLogin(LoginViewModel userLogin)
        {
            try
            {

                var business = DependencyFactory.Resolve<ILoginBusiness>();
                var userView = business.LoginUser(userLogin);
                //seguridadProxy.LoginUsuario(userLogin);
                UsuarioApp user = new UsuarioApp { Mail = userLogin.Name, Ip = System.Web.HttpContext.Current.Request.UserHostAddress };
                user.MenuUsuario = userView.Menu;
                AuthenticationFormsClient.SetAuthenticationCookie(user.Mail, true, user);
                return "OK";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        [HttpGet]
        public void DoLogout()
        {
            try
            {
                var user = AuthenticationFormsClient.GetUsuario(System.Web.HttpContext.Current.Request);
                if (user != null)
                {
                    AuthenticationFormsClient.RemoveAuthenticationCookie();
                    //seguridadProxy.LogOutUsuario(new EntityBase
                    //{
                    //    Usuario = userPDC.Nombre,
                    //    Ip = System.Web.HttpContext.Current.Request.UserHostAddress
                    //});
                }
            }
            catch
            {
                
            }

        }

        [HttpGet]
        public UsuarioApp GetUserLogued()
        {
            return AuthenticationFormsClient.GetUsuario(System.Web.HttpContext.Current.Request);
        }

        [HttpGet]
        public bool ValidateRequest()
        {
            try
            {
                
                return true;
            }
            catch
            {
                AuthenticationFormsClient.RemoveAuthenticationCookie();
                return false;
            }
        }
    }
}