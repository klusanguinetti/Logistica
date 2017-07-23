namespace Logistica.ViewModel
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.Web;

    public class MenuViewModel
    {
        public long Id { get; set; }

        public long? ParentId { get; set; }

        public string Nombre { get; set; }

        public string Url { get; set; }

        public bool ShowMenu { get; set; }

        public string Icon { get; set; }

    }
}