using System;
using System.IO;
using System.Linq;
using Composite.EventSystem;
using System.Reflection;


namespace Composite.Types
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

        public static Type GetType(string fullName)
        {
            return _buildManager.GetType(fullName);
        }



        public static bool HasType(Type type)
        {
            return _buildManager.HasType(type);
        }



        public static bool IsAssemlbyCurrentBuildedAssembly(Assembly assembly)
        {
            return _buildManager.IsAssemlbyCurrentBuildedAssembly(assembly);
        }


        public static void LoadAssemlby(string assemblyFilename)
        {
            _buildManager.LoadAssemlby(assemblyFilename);
        }

        // Helper
        public static int GetAssemblyVersion(Assembly assembly)
        {
            if (assembly == null) throw new ArgumentNullException("assembly");

            if (assembly.IsDynamicBuild() == false) throw new ArgumentException("The assembly is not dynamic build");

            return assembly.GetTypes().First().GetAssemblyVersionNumber();
        }        

        #endregion


        #region CompiledTypes methods

        public static void GetCompiledTypes(BuildManagerCompileUnit buildManagerCompileUnit)
        {
            _buildManager.GetCompiledTypes(buildManagerCompileUnit);
        }

     
   public static CompatibilityCheckResult CheckAppCodeCompatibility(BuildManagerCompileUnit compilationUnit)
        {
            return _buildManager.CheckAppCodeCompatibility(compilationUnit);
        }

      

  public static CompatibilityCheckResult CheckIfAppCodeDependsOnInterface(Guid immutableTypeId)
        {
            return _buildManager.CheckIfAppCodeDependsOnInterface(immutableTypeId);
        }

        public static bool RemoveCompiledType(Guid immutableTypeId)
        {
            return _buildManager.RemoveCompiledType(immutableTypeId);
        }

        #endregion


        #region Initialization and finalization of the caching system methods

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



        public static bool ClearCache()
        {
            return _buildManager.ClearCache(true);
        }



        public static bool ClearCache(bool alsoBinFiles)
        {
            return _buildManager.ClearCache(alsoBinFiles);
        }


        public static void RebuildCache(BuildManagerCompileUnit[] buildManagerCompileUnits)
        {
            _buildManager.RebuildCache(buildManagerCompileUnits);
        }

        public static void InitializeCachingSytem()
        {
            _buildManager.InitializeCachingSytem();
        }



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
