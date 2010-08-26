using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;

namespace Composite.Plugins.Forms.WebChannel.UiContainerFactories.Base
{
    internal interface ITemplatedUiContainerFactoryData
    {
        string UserControlVirtualPath { get; set; }

        bool CacheCompiledUserControlType { get; set; }
    }
}
