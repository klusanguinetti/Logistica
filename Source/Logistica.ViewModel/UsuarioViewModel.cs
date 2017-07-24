using System;
using System.Collections.Generic;

namespace Logistica.ViewModel
{
    public class UsuarioViewModel
    {

        public UsuarioViewModel()
        {
            Menu=new List<MenuViewModel>();
        }

        public long Id { get; set; }
        
        public string Mail { get; set; }
        
        public long TipoUsuarioId { get; set; }
        
        public string Password { get; set; }
        
        public long? DatosPersonaId { get; set; }
        
        public string Nombre { get; set; }
        
        public string Apellido { get; set; }
        
        public DateTime? UltimoLogin { get; set; }

        public List<MenuViewModel> Menu { get; set; }
    }


}
