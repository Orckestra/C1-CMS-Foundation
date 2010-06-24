using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Forms.Plugins.UiControlFactory;
using Composite.Forms;
using Composite.Logging;

namespace Composite.StandardPlugins.Forms.WebChannel.UiControlFactories.Base
{
    internal abstract class BaseTemplatedUiControlFactory : IUiControlFactory
    {
        private ITemplatedUiControlFactoryData _data;
        private Type _cachedUserControlType = null;
        private object _lock = new object();

        protected BaseTemplatedUiControlFactory(ITemplatedUiControlFactoryData data)
        {
            _data = data;
        }


        protected Type UserControlType
        {
            get
            {
                return this.CachedUserControlType;
            }
        }



        private Type CachedUserControlType
        {
            get
            {
                lock (_lock)
                {
                    if (_cachedUserControlType == null || _data.CacheCompiledUserControlType == false)
                    {
                        using (DebugLoggingScope.CompletionTime(this.GetType(), string.Format("getting compiled '{0}'", _data.UserControlVirtualPath), TimeSpan.FromMilliseconds(25)))
                        {
                            _cachedUserControlType = System.Web.Compilation.BuildManager.GetCompiledType(_data.UserControlVirtualPath);
                        }
                    }

                    return _cachedUserControlType;
                }
            }
        }

        public abstract IUiControl CreateControl();
    }


}
