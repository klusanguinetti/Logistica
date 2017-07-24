using Logistica.Entity;
using Logistica.IBusiness;
using Logistica.UnityInject;
using Logistica.ViewModel;
using Logistica.Web.Security;

namespace Logistica.Web.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Web.Http;

    public class DatosPersonalesApiController : BaseApiController
    {

        [HttpGet]
        public DatosPersonaViewModel GetDatosPersonales()
        {
            try
            {
                var user = AuthenticationFormsClient.GetUsuario(System.Web.HttpContext.Current.Request);

                var business = DependencyFactory.Resolve<IUsuarioBusiness>();
                var datos = business.ObtenerDatosPersonales(user.Mail);
                return datos;
            }
            catch
            {
                return null;
            }

        }

    }
}
