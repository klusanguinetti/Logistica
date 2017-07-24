using Logistica.ViewModel;

namespace Logistica.ViewModel
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Principal;
    using System.Runtime.Serialization;
    using System.Web.Script.Serialization;
    using Newtonsoft.Json;
    [Serializable]
    public class UsuarioApp
    {

        #region constructor
        public UsuarioApp()
        {
            CookieMenuPlano = Guid.NewGuid().ToString();
        }
        #endregion
        #region atributos

        [DataMember]
        public string Mail { get; set; }

        //[DataMember]
        //public string Password { private get; set; }

        [DataMember]
        public string Ip { get; set; }

        [DataMember]
        public string CookieMenuPlano { get; set; }

        //private List<MenuViewModel> ilMenuAll = null;
        [ScriptIgnore]
        [JsonIgnore]
        public IEnumerable<MenuViewModel> MenuUsuario { get; set; }

        #endregion

        #region metodos
       

        public IEnumerable<MenuViewModel> GetHeaderMenu()
        {
            return MenuUsuario.Where(o => !o.ParentId.HasValue);
        }

        
        public IEnumerable<MenuViewModel> GetMenu()
        {
            return MenuUsuario;
        }
        #endregion
    }
    public class PDCPrincipal : IPrincipal
    {

        public IIdentity Identity { get; private set; }


        public bool IsInRole(string role) => true;


        public UsuarioApp UserData { get; set; }


        public PDCPrincipal(UsuarioApp userData)
        {
            this.UserData = userData;
            this.Identity = new GenericIdentity(userData.Mail);
        }
    }
}