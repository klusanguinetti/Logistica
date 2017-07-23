using System;
using System.Collections.Generic;
using System.Linq;
namespace Logistica.Entity 
{ 
	public class Reserva 
	{
		#region Atributos
		public long Id
		{
			get;
			set;
		}
		public virtual DateTime? Desde { get; set; }
 		public virtual DateTime? Fecha { get; set; }
 		public virtual DateTime? Hasta { get; set; }
 		public virtual Logistica.Entity.Producto Producto { get; set; }
 		public virtual Logistica.Entity.Usuario Usuario { get; set; }
 		#endregion 
	}
}
