using System;
using System.Collections.Generic;
using System.Linq;
namespace Logistica.Entity 
{ 
	public class DatosPersona 
	{
		#region Atributos
		public long Id
		{
			get;
			set;
		}
		public virtual String Apellido { get; set; }
 		public virtual String Ciudad { get; set; }
 		public virtual String CodigoPostal { get; set; }
 		public virtual String Direccion { get; set; }
 		public virtual DateTime? FechaNacimiento { get; set; }
 		public virtual String Mail { get; set; }
 		public virtual String Nombre { get; set; }
 		public virtual String NumeroDocumento { get; set; }
 		public virtual String Pais { get; set; }
 		public virtual String PaisIso { get; set; }
 		public virtual String Provincia { get; set; }
 		public virtual String Telefono { get; set; }
 		public virtual String TipoDocumento { get; set; }
 		public virtual Logistica.Entity.Usuario Usuario { get; set; }
 		#endregion 
	}
}
