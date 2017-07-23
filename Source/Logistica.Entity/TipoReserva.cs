using System;
using System.Collections.Generic;
using System.Linq;
namespace Logistica.Entity 
{ 
	public class TipoReserva 
	{
		#region Atributos
		public long Id
		{
			get;
			set;
		}
		public virtual String Descripcion { get; set; }
 		#endregion 
	}
}
