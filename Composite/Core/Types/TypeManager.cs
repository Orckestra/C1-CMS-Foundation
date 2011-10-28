using System;
using System.Collections.Generic;
using Composite.C1Console.Events;


namespace Composite.Core.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class TypeManager
    {
        private static ITypeManager _implementation = new TypeManagerImpl();

        internal static ITypeManager Implementation { get { return _implementation; } set { _implementation = value; } }

#warning MRJ: BM: MAJOC HACK!!!
        public static List<Type> CompiledTypes = new List<Type>();


        static TypeManager()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        /// <exclude />
        public static Type GetType(string fullName)
        {
            return _implementation.GetType(fullName);
        }



        /// <summary>
        /// Returns the type with the provided fullName (or null).
        /// </summary>
        /// <returns>A type or null</returns>
        public static Type TryGetType(string fullName)
        {
            return _implementation.TryGetType(fullName);
        }



#warning MRJ: BM: Is this needed? Should we kill the DynamicType: ?
        public static string GetRuntimeFullName(string fullName)
        {
            if (fullName.StartsWith("DynamicType:")) return fullName.Remove(0, "DynamicType:".Length);

            return fullName;
        }


        /// <exclude />
        public static string SerializeType(Type type)
        {
            return _implementation.SerializeType(type);
        }



        /// <exclude />
        public static string TrySerializeType(Type type)
        {
            return _implementation.TrySerializeType(type);
        }



        /// <summary>
        /// This method return true if there is type with the fullname <para>typeFullname</para> anywhere in the system.
        /// </summary>
        /// <param name="typeFullname">Full name: namespace+name. X.Y.Z where X.Y is the namespace and Z is the type.</param>
        /// <returns></returns>
        public static bool HasTypeWithName(string typeFullname)
        {
            return _implementation.HasTypeWithName(typeFullname);
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            _implementation.OnFlush();
        }
    }
}

