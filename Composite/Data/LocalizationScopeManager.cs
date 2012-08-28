using System;
using System.Collections.Generic;
using System.Globalization;
using Composite.Core.Caching;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class LocalizationScopeManager
    {
        /// <exclude />
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



        /// <exclude />
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


        private static Stack<CultureInfo> LocalizationScopeStack
        {
            get
            {
                return RequestLifetimeCache.GetCachedOrNew<Stack<CultureInfo>>("LocalizationScopeManager:Stack");
            }
        }
    }
}
