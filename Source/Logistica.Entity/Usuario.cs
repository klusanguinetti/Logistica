using System;
using System.Collections.Generic;
using System.Linq;
namespace Logistica.Entity 
{ 
	public class Usuario 
	{
		#region Atributos
		public long Id { get; set; }
        public virtual String Mail { get; set; }
		public virtual String Password { get; set; }
		public virtual TipoUsuario TipoUsuario { get; set; }
        public virtual DatosPersona DatosPersona { get; set; }
        public virtual DateTime? UltimoLogin { get; set; }
        #endregion
    }
}
