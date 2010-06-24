using System;
using System.Collections.Generic;
using System.Globalization;


namespace Composite.Data
{
    public static class LocalizationScopeManager
    {
        public static CultureInfo CurrentLocalizationScope
        {
            get
            {
                var stack = LocalizationScopeStack;

                if (stack.Count != 0)
                {
                    return stack.Peek();
                }
                
                return CultureInfo.InvariantCulture;
            }
        }



        public static CultureInfo MapByType(Type type)
        {
            if (DataLocalizationFacade.IsLocalized(type) == true)
            {
                return CurrentLocalizationScope;
            }
            
            return CultureInfo.InvariantCulture;
        }



        internal static void PushLocalizationScope(CultureInfo cultureInfo)
        {
            LocalizationScopeStack.Push(cultureInfo);
        }



        internal static void PopLocalizationScope()
        {
            var stack = LocalizationScopeStack;

            if (stack.Count > 0)
            {
                stack.Pop();
            }
        }


        internal static bool IsEmpty
        {
            get
            {
                return (LocalizationScopeStack.Count == 0);
            }
        }



        // Using thread statis because the request life time cache does not work if a non-asp.net is the invoker /MRJ
        [ThreadStatic]
        public static Stack<CultureInfo> _localizationScopeStack = null;


        private static Stack<CultureInfo> LocalizationScopeStack
        {
            get
            {
                var currentScopeStack = _localizationScopeStack;
                if (currentScopeStack != null)
                {
                    return currentScopeStack;
                }

                var stack = new Stack<CultureInfo>();

                _localizationScopeStack = stack;

                return stack;
            }
        }
    }
}
