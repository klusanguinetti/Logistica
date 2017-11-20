namespace Logistica.Common
{
    using Newtonsoft.Json;
    using System.Configuration;
    using System.IO;
    using System.Text;
    using System.Xml;
    using System.Xml.Serialization;
    /// <summary>
    /// Extension class JsonSerialization
    /// </summary>
    public static class JsonSerialization
    {
        #region atributos

        #endregion

        #region metodos
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T">type</typeparam>
        /// <param name="jsonString"></param>
        /// <param name="settings">JsonSerializerSettings</param>
        /// <returns>objetc type</returns>
        public static T DeserializarToJson<T>(this string jsonString, dynamic settings = null)
        {
            try
            {
                if (settings != null && settings is JsonSerializerSettings)
                    return JsonConvert.DeserializeObject<T>(jsonString, settings);
                else
                    return JsonConvert.DeserializeObject<T>(jsonString);

            }
            catch
            {
                return default(T);
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T">type</typeparam>
        /// <param name="obj">this</param>
        /// <param name="settings">JsonSerializerSettings</param>
        /// <returns>string json</returns>
        public static string SerializarToJson<T>(this T obj, dynamic settings = null)
        {
            try
            {
                if (settings != null && settings is JsonSerializerSettings)
                    return JsonConvert.SerializeObject(obj, settings);
                else
                    return JsonConvert.SerializeObject(obj);
            }
            catch
            {
                return string.Empty;
            }
        }
        #endregion
    }
    /// <summary>
    /// Extension class XmlSerialization
    /// </summary>
    public static class XmlSerialization
    {
        #region constructor
        static XmlSerialization()
        {
            IsbanSerializationEncoding = !string.IsNullOrEmpty(ConfigurationManager.AppSettings["IsbanSerializationEncoding"])
                ? ConfigurationManager.AppSettings["IsbanSerializationEncoding"]
                : string.Empty;
        }
        #endregion

        #region atributos
        public static string IsbanSerializationEncoding { get; set; }
        #endregion

        #region metodos
        public static T DeserializarTo<T>(this string xmlSerializado)
        {
            try
            {
                var xmlSerz = new XmlSerializer(typeof(T));
                using (var strReader = new StringReader(xmlSerializado))
                {
                    var obj = xmlSerz.Deserialize(strReader);
                    return (T)obj;
                }
            }
            catch (System.Exception)
            {
                return default(T);
            }
        }

        public static string SerializarToXml<T>(this T obj) where T : new()
        {
            try
            {
                var xmlWriterSettings = new XmlWriterSettings
                {
                    Indent = true,
                    //CloseOutput = false,
                    //OmitXmlDeclaration = false,
                };
                if (!string.IsNullOrEmpty(IsbanSerializationEncoding))
                {
                    xmlWriterSettings.Encoding = Encoding.GetEncoding(IsbanSerializationEncoding);
                }
                else
                {
                    xmlWriterSettings.Encoding = Encoding.UTF8;
                }
                string resultXml;
                using (var memoryStream = new MemoryStream())
                {
                    using (var xw = XmlWriter.Create(memoryStream, xmlWriterSettings))
                    {
                        var s = new XmlSerializer(typeof(T));
                        s.Serialize(xw, obj);
                    }

                    resultXml = xmlWriterSettings.Encoding.GetString(memoryStream.ToArray());
                }
                return resultXml;
            }
            catch
            {
                return string.Empty;
            }
        }

        public static T SerializarClass<T>(this string nombreArchivo)
        {
            var reader = new StreamReader(nombreArchivo);
            var xml = reader.ReadToEnd();
            reader.Close();
            var xmlSerz = new XmlSerializer(typeof(T));

            using (var strReader = new StringReader(xml))
            {
                var obj = xmlSerz.Deserialize(strReader);
                return (T)obj;
            }
        }
        #endregion
    }
}