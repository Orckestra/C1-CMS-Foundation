using System;
using System.Collections.Generic;
using Composite.C1Console.Events;


namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class AuxiliarySecurityAncestorFacade
	{
        private static IAuxiliarySecurityAncestorFacade _implementation = new AuxiliarySecurityAncestorFacadeImpl();


        static AuxiliarySecurityAncestorFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => _implementation.Flush());
        }


        internal static IAuxiliarySecurityAncestorFacade Implementation { get { return _implementation; } set { _implementation = value; } }



        /// <exclude />
        public static IEnumerable<EntityToken> GetParents(EntityToken entityToken)
        {
            return _implementation.GetParents(entityToken);
        }



        // Overload
        /// <summary>
        /// Providers will get flushed on flushes
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="auxiliarySecurityAncestorProvider"></param>
        public static void AddAuxiliaryAncestorProvider<T>(IAuxiliarySecurityAncestorProvider auxiliarySecurityAncestorProvider) 
            where T : EntityToken
        {
            AddAuxiliaryAncestorProvider(typeof(T), auxiliarySecurityAncestorProvider);
        }



        // Overload
        /// <summary>
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="auxiliarySecurityAncestorProvider"></param>
        /// <param name="flushPersistent"></param>
        public static void AddAuxiliaryAncestorProvider<T>(IAuxiliarySecurityAncestorProvider auxiliarySecurityAncestorProvider, bool flushPersistent)
            where T : EntityToken
        {
            AddAuxiliaryAncestorProvider(typeof(T), auxiliarySecurityAncestorProvider, flushPersistent);
        }



        /// <summary>
        /// Providers will get flushed on flushes
        /// </summary>
        /// <param name="entityTokenType"></param>
        /// <param name="auxiliarySecurityAncestorProvider"></param>
        public static void AddAuxiliaryAncestorProvider(Type entityTokenType, IAuxiliarySecurityAncestorProvider auxiliarySecurityAncestorProvider)
        {
            _implementation.AddAuxiliaryAncestorProvider(entityTokenType, auxiliarySecurityAncestorProvider, false);
        }



        /// <summary>
        /// Providers will get flushed on flushes
        /// </summary>
        /// <param name="entityTokenType"></param>
        /// <param name="auxiliarySecurityAncestorProvider"></param>
        /// <param name="flushPersistent"></param>
        public static void AddAuxiliaryAncestorProvider(Type entityTokenType, IAuxiliarySecurityAncestorProvider auxiliarySecurityAncestorProvider, bool flushPersistent)
        {
            _implementation.AddAuxiliaryAncestorProvider(entityTokenType, auxiliarySecurityAncestorProvider, flushPersistent);
        }



        /// <exclude />
        public static IEnumerable<IAuxiliarySecurityAncestorProvider> GetAuxiliaryAncestorProviders(Type entityTokenType)
        {
            return _implementation.GetAuxiliaryAncestorProviders(entityTokenType);
        }
	}
}
