using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;

namespace Composite.Types
{
	internal interface IBuildManager
    {
        #region Type and assembly methods

        Type GetType(string fullName);
        bool HasType(Type type);
        bool IsAssemlbyCurrentBuildedAssembly(Assembly assembly);
        void LoadAssemlby(string assemblyFilename);

        #endregion

        #region CompiledTypes methods

        void GetCompiledTypes(BuildManagerCompileUnit buildManagerCompileUnit);
        CompatibilityCheckResult CheckAppCodeCompatibility(BuildManagerCompileUnit compilationUnit);
	    CompatibilityCheckResult CheckIfAppCodeDependsOnInterface(Guid immutableTypeId);
        bool RemoveCompiledType(Guid immutableTypeId);

        #endregion

        #region Initialization and finalization of the caching system methods
        
        bool CachingEnabled { get; set; }


        /// <summary>
        /// This method will create Composite.Genereated.dll assemlby
        /// </summary>
        void CreateCompositeGeneretedAssembly();


        /// <summary>
        /// </summary>
        /// <returns>Returns true if files from bin has been deleted</returns>                
        bool ClearCache(bool alsoBinFiles);

	    void RebuildCache(BuildManagerCompileUnit[] buildManagerCompileUnits);
        
        void InitializeCachingSytem();
        
        
        void FinalizeCachingSytem();
        #endregion

        #region Event methods
        Assembly OnAssemblyResolve(object sender, ResolveEventArgs args);
        void Flush();
        void PostFlush();
        #endregion
    }
}
