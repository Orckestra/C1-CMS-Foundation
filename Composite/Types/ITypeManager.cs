using System;

namespace Composite.Types
{
	internal interface ITypeManager
	{
        Type GetType(string fullName);
        Type TryGetType(string fullName);
        string SerializeType(Type type);
        string TrySerializeType(Type type);
        bool HasTypeWithName(string typeFullname);
        void OnFlush();
	}
}
