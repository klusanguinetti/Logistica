using System;
using System.Collections.Generic;
using System.Linq;
namespace Logistica.Entity 
{ 
	public class TipoProducto 
	{
		#region Atributos
		public long Id
		{
			get;
			set;
		}
		public virtual String Nombre { get; set; }
 		#endregion 
	}
}
