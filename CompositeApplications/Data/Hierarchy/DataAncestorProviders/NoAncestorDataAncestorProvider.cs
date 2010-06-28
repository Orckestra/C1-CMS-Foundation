using System;


namespace Composite.Data.Hierarchy.DataAncestorProviders
{
	internal sealed class NoAncestorDataAncestorProvider : IDataAncestorProvider
	{
        public IData GetParent(IData data)
        {
            if (data == null) throw new ArgumentNullException("data");

            return null;
        }
    }
}
