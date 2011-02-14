using System;
using System.Linq;
using System.Reflection;
using Composite.C1Console.Events;


namespace Composite.Core.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class BuildManager
	{
        private static IBuildManager _buildManager = new BuildManagerImpl();


        static BuildManager()
        {
            AppDomain.CurrentDomain.AssemblyResolve += OnAssemblyResolve;

            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
            GlobalEventSystemFacade.SubscribeToPostFlushEvent(OnPostFlushEvent);
        }


        internal static IBuildManager Implementation { get { return _buildManager; } set { _buildManager = value; } }



        #region Type and assembly methods

        /// <exclude />
        public static Type GetType(string fullName)
        {
            return _buildManager.GetType(fullName);
        }



        /// <exclude />
        public static bool HasType(Type type)
        {
            return _buildManager.HasType(type);
        }



        /// <exclude />
        public static bool IsAssemlbyCurrentBuildedAssembly(Assembly assembly)
        {
            return _buildManager.IsAssemlbyCurrentBuildedAssembly(assembly);
        }



        /// <exclude />
        public static void LoadAssemlby(string assemblyFilename)
        {
            _buildManager.LoadAssemlby(assemblyFilename);
        }



        // Helper
        /// <exclude />
        public static int GetAssemblyVersion(Assembly assembly)
        {
            if (assembly == null) throw new ArgumentNullException("assembly");

            if (assembly.IsDynamicBuild() == false) throw new ArgumentException("The assembly is not dynamic build");

            return assembly.GetTypes().First().GetAssemblyVersionNumber();
        }        

        #endregion


        #region CompiledTypes methods

        /// <exclude />
        public static void GetCompiledTypes(BuildManagerCompileUnit buildManagerCompileUnit)
        {
            _buildManager.GetCompiledTypes(buildManagerCompileUnit);
        }


        /// <exclude />
        public static CompatibilityCheckResult CheckAppCodeCompatibility(BuildManagerCompileUnit compilationUnit)
        {
            return _buildManager.CheckAppCodeCompatibility(compilationUnit);
        }


        /// <exclude />
        public static CompatibilityCheckResult CheckIfAppCodeDependsOnInterface(Guid immutableTypeId)
        {
            return _buildManager.CheckIfAppCodeDependsOnInterface(immutableTypeId);
        }


        /// <exclude />
        public static bool RemoveCompiledType(Guid immutableTypeId)
        {
            return _buildManager.RemoveCompiledType(immutableTypeId);
        }

        #endregion


        #region Initialization and finalization of the caching system methods
        
        /// <exclude />
        public static bool CachingEnabled
        {
            get
            {
                return _buildManager.CachingEnabled;
            }
            set
            {
                _buildManager.CachingEnabled = value;
            }
        }



        /// <summary>
        /// This method will create Composite.Genereated.dll assemlby
        /// </summary>
        public static void CreateCompositeGeneretedAssembly()
        {
            _buildManager.CreateCompositeGeneretedAssembly();
        }



        /// <exclude />
        public static bool ClearCache()
        {
            return _buildManager.ClearCache(true);
        }



        /// <exclude />
        public static bool ClearCache(bool alsoBinFiles)
        {
            return _buildManager.ClearCache(alsoBinFiles);
        }


        /// <exclude />
        public static void RebuildCache(BuildManagerCompileUnit[] buildManagerCompileUnits)
        {
            _buildManager.RebuildCache(buildManagerCompileUnits);
        }


        /// <exclude />
        public static void InitializeCachingSytem()
        {
            _buildManager.InitializeCachingSytem();
        }


        /// <exclude />
        public static void FinalizeCachingSytem()
        {
            _buildManager.FinalizeCachingSytem();
        }

        #endregion        


        #region Event methods

        private static Assembly OnAssemblyResolve(object sender, ResolveEventArgs args)
        {
            return _buildManager.OnAssemblyResolve(sender, args);
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            _buildManager.Flush();
        }



        private static void OnPostFlushEvent(PostFlushEventArgs args)
        {
            _buildManager.PostFlush();
        }
        #endregion
    }
}
