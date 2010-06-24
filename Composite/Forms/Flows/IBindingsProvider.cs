using System.Collections.Generic;


namespace Composite.Forms.Flows
{
    public interface IBindingsProvider
    {
        Dictionary<string, object> GetBindings();
    }
}
