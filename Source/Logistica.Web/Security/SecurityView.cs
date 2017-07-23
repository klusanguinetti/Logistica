using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Logistica.Web.Security
{
    public static class SecurityView
    {

        public static bool TieneAcceso(string modulo)
        {
            //var user = AuthenticationFormsClient.GetUsuarioPDC(HttpContext.Current.Request);
            //if (user != null)
            //{
            //    return !string.IsNullOrEmpty(user.Permisos(modulo));
            //}
            return false;
        }

        public static bool TienePermisos(string modulo, string permiso)
        {
            //var user = AuthenticationFormsClient.GetUsuarioPDC(HttpContext.Current.Request);
            //if (user != null)
            //{
            //    return user.Permisos(modulo).Contains(permiso);
            //}
            return false;
        }

    }
}