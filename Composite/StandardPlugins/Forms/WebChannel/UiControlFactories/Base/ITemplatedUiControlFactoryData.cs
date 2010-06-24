using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Forms.Plugins.UiControlFactory;
using System.Configuration;

namespace Composite.StandardPlugins.Forms.WebChannel.UiControlFactories.Base
{
    internal interface ITemplatedUiControlFactoryData
    {
        string UserControlVirtualPath { get; set; }

        bool CacheCompiledUserControlType { get; set; }
    }
}
