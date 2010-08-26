using System;
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



        static TypeManager()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



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



        public static string SerializeType(Type type)
        {
            return _implementation.SerializeType(type);
        }



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

