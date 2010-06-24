using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Forms;
using Composite.Logging;
using Composite.Forms.Flows.Plugins.UiContainerFactory;
using Composite.Forms.Flows;

namespace Composite.StandardPlugins.Forms.WebChannel.UiContainerFactories.Base
{
    internal abstract class BaseTemplatedUiContainerFactory : IUiContainerFactory
    {
        private ITemplatedUiContainerFactoryData _data;
        private Type _cachedUserControlType = null;
        private object _lock = new object();

        protected BaseTemplatedUiContainerFactory(ITemplatedUiContainerFactoryData data)
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
                        using (DebugLoggingScope.CompletionTime(this.GetType(), string.Format("getting compiled '{0}'", _data.UserControlVirtualPath, TimeSpan.FromMilliseconds(25))))
                        {
                            _cachedUserControlType = System.Web.Compilation.BuildManager.GetCompiledType(_data.UserControlVirtualPath);
                        }
                    }

                    return _cachedUserControlType;
                }
            }
        }

        public abstract IUiContainer CreateContainer();
    }


}
