

using Logistica.IBusiness;
using Logistica.UnityInject;

namespace Logistica.Web.Controllers
{
    using System;
    using System.Web.Http;
    using System.Collections.Generic;
    using Logistica.Web.Security;
    using Logistica.ViewModel;
    public class RegistracionApiController : BaseApiController
    {
        #region atributos   

        #endregion

        public RegistracionApiController()
        {

        }

        public bool Registrarse(RegistrarseViewModel registrarse)
        {
            var business = DependencyFactory.Resolve<ILoginBusiness>();
            return business.Registracion(registrarse); ;
        }
        [HttpGet]
        public RegistrarseViewModel GetViewModel()
        {
            return new RegistrarseViewModel();
        }
    }
}