using System.Collections.Generic;


namespace Composite.C1Console.Forms.Flows
{
    internal interface IBindingsProvider
    {
        Dictionary<string, object> GetBindings();
    }
}
