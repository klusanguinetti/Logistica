using System;
using System.Collections.Generic;
using System.Linq;
namespace Logistica.Entity 
{ 
	public class Producto 
	{
		#region Atributos
		public long Id
		{
			get;
			set;
		}
		public virtual String Nombre { get; set; }
 		public virtual Logistica.Entity.TipoProducto TipoProducto { get; set; }
 		public virtual Logistica.Entity.TipoReserva TipoReserva { get; set; }
 		#endregion 
	}
}
