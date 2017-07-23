using Logistica.ViewModel;

namespace Logistica.Web.Security
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
        //private List<Modulo> AllModulos()
        //{
        //    var allModulos = new List<Modulo>();
        //    foreach (var grupo in Grupos)
        //    {
        //        allModulos.AddRange(grupo.Modulos);
        //    }
        //    return allModulos;
        //}
        //public string Permisos(string modulo)
        //{
        //    var ilModulos = AllModulos().Where(o => o.Nombre.Equals(modulo));
        //    if (ilModulos.Any())
        //    {
        //        var permisos = "V";
        //        foreach (var imodulo in ilModulos)
        //        {
        //            foreach (var access in imodulo.Permisos)
        //            {
        //                if (!permisos.Contains(access))
        //                    permisos += access;
        //            }
        //        }

        //        return permisos;
        //    }

        //    return string.Empty;
        //}

        public IEnumerable<MenuViewModel> GetHeaderMenu()
        {
            return MenuUsuario.Where(o => !o.ParentId.HasValue);
        }

        
        public IEnumerable<MenuViewModel> GetMenu()
        {
            return MenuUsuario;
        }

        //private void FillMenuViewModel()
        //{
        //    if (MenuPlanoPdc == null || MenuPlanoPdc.Any())
        //    {
        //        var allModulos = AllModulos();
        //        ilMenuAll = new List<MenuViewModel>();
        //        foreach (var menu in MenuPlanoPdc)
        //        {
        //            if (allModulos.Exists(o => menu.Modulos!=null && menu.Modulos.Contains(o.Nombre)))
        //            {
        //                    ilMenuAll.Add(new MenuViewModel
        //                    {
        //                        Class = menu.Clase,
        //                        Description = menu.Descripcion,
        //                        Id = menu.Id,
        //                        ImageMenu = menu.ImgMenu,
        //                        Level = menu.IdNivel.GetValueOrDefault(),
        //                        Order = menu.Orden.GetValueOrDefault(),
        //                        Parent = menu.ParentId,
        //                        ShowMenu = true,
        //                        Url = menu.VistaInicio,
        //                        DescriptionMenu = menu.Descripcion
        //                    });
        //            }
        //        }
        //    }
        //    MenuUsuario = ilMenuAll;
        //}
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