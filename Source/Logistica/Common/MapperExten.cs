namespace Logistica.Common
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Reflection;
    /// <summary>
    /// Enum TypeMapper
    /// </summary>
    public enum TypeMapper
    {
        IgnoreCaseSensitive,
        None
    }
    /// <summary>
    /// Enum ModeExcludeWord
    /// </summary>
    public enum ModeExcludeWord
    {
        Source,
        Target,
        All
    }

    /// <summary>
    /// Extension class Mapper
    /// </summary>
    public static class Mapper
    {
        #region metodos
        public static T MapperClass<T>(this object source)
            where T : new()
        {
            return MapperClass(source, new T());
        }

        public static T MapperClass<T>(this object source, T target)
            where T : new()
        {
            return MapperClass(source, target, TypeMapper.None);
        }

        public static T MapperClass<T>(this object source, TypeMapper typeMapper)
            where T : new()
        {
            return MapperClass(source, new T(), typeMapper);
        }

        public static T MapperClass<T>(this object source, T target, TypeMapper typeMapper)
            where T : new()
        {
            return MapperClass(source, target, typeMapper, "");
        }

        public static T MapperClass<T>(this object source, TypeMapper typeMapper, params string[] excludeWord)
            where T : new()
        {
            return MapperClass(source, new T(), typeMapper, excludeWord);
        }

        public static T MapperClass<T>(this object source, T target, TypeMapper typeMapper, params string[] excludeWord)
            where T : new()
        {
            return MapperClass(source, target, typeMapper, ModeExcludeWord.All, excludeWord);
        }

        public static T MapperClass<T>(this object source, TypeMapper typeMapper, ModeExcludeWord modeExcludeWord, params string[] excludeWord)
            where T : new()
        {
            return MapperClass(source, new T(), typeMapper, modeExcludeWord, excludeWord);
        }

        private static List<KeyValuePair<string, PropertyInfo>> GetPropertyInfo(object source, TypeMapper typeMapper, ModeExcludeWord modeExcludeWord, bool validateSet, params string[] excludeWord)
        {
            List<KeyValuePair<string, PropertyInfo>> liResult = new List<KeyValuePair<string, PropertyInfo>>();
            var liPropertyInfoSource = validateSet ? source.GetType().GetProperties().Where(o => o.GetSetMethod() != null) : source.GetType().GetProperties();
            foreach (var sourcePropertyInfo in liPropertyInfoSource)
            {
                string sourcePropertyName;
                switch (modeExcludeWord)
                {
                    case ModeExcludeWord.All:
                    case ModeExcludeWord.Source:
                        sourcePropertyName = FillNameProperty(sourcePropertyInfo.Name, excludeWord);
                        break;
                    default:
                        sourcePropertyName = sourcePropertyInfo.Name;
                        break;
                }
                if (typeMapper.Equals(TypeMapper.IgnoreCaseSensitive))
                {
                    sourcePropertyName = sourcePropertyName.ToUpper(CultureInfo.InvariantCulture);
                }
                liResult.Add(new KeyValuePair<string, PropertyInfo>(sourcePropertyName, sourcePropertyInfo));
            }
            return liResult;
        }

        public static T MapperClass<T>(this object source, T target, TypeMapper typeMapper, ModeExcludeWord modeExcludeWord, params string[] excludeWord)
            where T : new()
        {

            try
            {

                var liSource = GetPropertyInfo(source, typeMapper, modeExcludeWord, false, excludeWord);
                var liTarget = GetPropertyInfo(target, typeMapper, modeExcludeWord, true, excludeWord);
                foreach (var keyValuePair in liSource)
                {
                    try
                    {
                        var ilTargetPropertyInfo = liTarget.Where(o => o.Key.Equals(keyValuePair.Key));
                        if (!ilTargetPropertyInfo.Any())
                            continue;
                        var targetPropertyInfo = ilTargetPropertyInfo.FirstOrDefault().Value;
                        var sourcePropertyInfo = keyValuePair.Value;
                        var valueSource = sourcePropertyInfo.GetValue(source, null);
                        try
                        {
                            if (sourcePropertyInfo.PropertyType != targetPropertyInfo.PropertyType)
                                targetPropertyInfo.SetValue(
                                    target,
                                    Convert.ChangeType(
                                        valueSource,
                                        sourcePropertyInfo.PropertyType,
                                        CultureInfo.InvariantCulture),
                                    null);
                            else
                                targetPropertyInfo.SetValue(target, valueSource, null);

                        }
                        catch (Exception)
                        {
                            try
                            {

                            }
                            catch
                            {

                                if (targetPropertyInfo.ToString().Contains("String"))
                                {
                                    try
                                    {
                                        targetPropertyInfo.SetValue(target, valueSource.ToString(), null);
                                    }
                                    catch { }
                                }

                            }
                        }
                    }
                    catch
                    {
                        continue;
                    }
                }
                return target;
            }
            catch { return target; }

        }

        private static string FillNameProperty(string name, IEnumerable<string> excludeWord)
        {
            return excludeWord.Aggregate(name, (current, s) => !string.IsNullOrEmpty(s) ? current.Replace(s, "") : current);
        }

        public static IEnumerable<T> MapperEnumerable<T>(this IEnumerable<object> source, TypeMapper typeMapper, ModeExcludeWord modeExcludeWord, params string[] excludeWord)
            where T : new()
        {
            return (from r in source select r.MapperClass<T>(typeMapper, modeExcludeWord, excludeWord));
        }

        public static IEnumerable<T> MapperEnumerable<T>(this IEnumerable<object> source, TypeMapper typeMapper, ModeExcludeWord modeExcludeWord)
            where T : new()
        {
            return MapperEnumerable<T>(source, typeMapper, modeExcludeWord, "");
        }

        public static IEnumerable<T> MapperEnumerable<T>(this IEnumerable<object> source, TypeMapper typeMapper)
            where T : new()
        {
            return MapperEnumerable<T>(source, typeMapper, ModeExcludeWord.All);
        }

        public static IEnumerable<T> MapperEnumerable<T>(this IEnumerable<object> source)
            where T : new()
        {
            return MapperEnumerable<T>(source, TypeMapper.None);
        }
        #endregion
    }
}