

using Logistica.ViewModel;

namespace Logistica.Web.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;
    using Security;

    public class CommonController : BaseApiController
    {
        #region atributos
       
        #endregion

       
        [HttpGet]
        public IEnumerable<MenuViewModel> GetMenu()
        {
            return AuthenticationFormsClient.GetUsuario(System.Web.HttpContext.Current.Request).GetMenu();
        }

        [HttpGet]
        public IEnumerable<MenuViewModel> GetHeaderMenu()
        {
            return AuthenticationFormsClient.GetUsuario(System.Web.HttpContext.Current.Request).GetHeaderMenu();
        }

       

    }
}