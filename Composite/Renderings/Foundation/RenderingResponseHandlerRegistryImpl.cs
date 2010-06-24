using System.Collections.Generic;
using Composite.ConfigurationSystem;
using Composite.Renderings.Plugins.RenderingResponseHandler;
using Composite.Renderings.Plugins.RenderingResponseHandler.Runtime;


namespace Composite.Renderings.Foundation
{
    internal sealed class RenderingResponseHandlerRegistryImpl : IRenderingResponseHandlerRegistry
	{
        private List<string> _renderingResponseHandlerNames = null;
        private static object _lock = new object();


        public IEnumerable<string> RenderingResponseHandlerNames
        {
            get 
            {
                Initialize();

                foreach (string name in _renderingResponseHandlerNames)
                {
                    yield return name;
                }
            }
        }



        public void Flush()
        {
            lock (_lock)
            {
                _renderingResponseHandlerNames = null;
            }
        }



        private void Initialize()
        {
            if (_renderingResponseHandlerNames == null)
            {
                lock (_lock)
                {
                    if (_renderingResponseHandlerNames == null)
                    {
                        _renderingResponseHandlerNames = new List<string>();

                        RenderingResponseHandlerSettings renderingResponseHandlerSettings = ConfigurationServices.ConfigurationSource.GetSection(RenderingResponseHandlerSettings.SectionName) as RenderingResponseHandlerSettings;
                        foreach (RenderingResponseHandlerData renderingResponseHandlerData in renderingResponseHandlerSettings.RenderingResponseHandlerPlugins)
                        {
                            _renderingResponseHandlerNames.Add(renderingResponseHandlerData.Name);
                        }
                    }
                }
            }
        }        
    }
}
