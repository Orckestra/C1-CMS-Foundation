using System;
using System.Collections.Generic;
using System.Web;


namespace Composite.Caching
{
    // Made public for Base site in App_Code/Composite/BasicSearch.cs
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class RequestLifetimeCache
	{
        private static Dictionary<object, object> _unitTestCahce = new Dictionary<object,object>();


        public static void Add(object key, object value)
        {
            var httpContext = HttpContext.Current;

            if (httpContext != null)
            {
                httpContext.Items.Add(key, value);
            }
            else if (RuntimeInformation.IsUnittest == true)
            {
                _unitTestCahce.Add(key, value);
            }
        }



        public static bool HasKey(object key)
        {
            var httpContext = HttpContext.Current;

            if (httpContext != null)
            {
                return httpContext.Items.Contains(key);
            }

            if (RuntimeInformation.IsUnittest == true)
            {
                return _unitTestCahce.ContainsKey(key);
            }

            return false;
        }



        public static object TryGet(object key)
        {
            var context = HttpContext.Current;

            if (context != null)
            {
                return context.Items[key];
            }

            if (RuntimeInformation.IsUnittest == true)
            {
                return _unitTestCahce[key];
            }

            return null;
        }



        public static T TryGet<T>(object key)
        {
            var context = HttpContext.Current;

            if (context != null)
            {
                object result =  context.Items[key];

                if (result != null)
                {
                    return (T)result;
                }
            }
            else if (RuntimeInformation.IsUnittest == true)
            {
                object result;
                if (_unitTestCahce.TryGetValue(key, out result) == true)
                {
                    return (T)result;
                }
            }

            return default(T);
        }



        public static void ClearAll()
        {
            var httpContext = HttpContext.Current;

            if (httpContext != null)
            {
                httpContext.Items.Clear();
            }
            else if (RuntimeInformation.IsUnittest == true)
            {
                _unitTestCahce = new Dictionary<object, object>();
            }
        }
    }
}
