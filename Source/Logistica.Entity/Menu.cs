using System;
using System.Collections.Generic;
using System.Linq;
namespace Logistica.Entity
{
    public class Menu
    {
        #region Atributos
        public long Id
        {
            get;
            set;
        }
        public virtual String Icon { get; set; }
        public virtual String Nombre { get; set; }
        public virtual long? ParentId { get; set; }
        public virtual Logistica.Entity.TipoUsuario TipoUsuario { get; set; }
        public virtual String Url { get; set; }
        #endregion
    }
}
