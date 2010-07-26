using System.Collections.Generic;


namespace Composite.Forms.Flows
{
    internal interface IBindingsProvider
    {
        Dictionary<string, object> GetBindings();
    }
}
