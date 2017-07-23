using System;
using System.Collections.Generic;
using System.Linq;
namespace Logistica.Entity 
{ 
	public class TipoUsuario 
	{
		#region Atributos
		public long Id { get; set; }
		
		public virtual String Descripcion { get; set; }
        public virtual String IsDefault { get; set; }
        #endregion
    }
}
