using System.ComponentModel;


namespace Composite.Core.Types
{
    /// <summary>
    /// Implementing this interface and regitre an instance with the method <see cref="CodeGenerationManager.AddAssemblyCodeProvider"/>
    /// you can get code compiled when C1 shuts down or restarts. 
    /// Use the <see cref="CodeGenerationBuilder"/> to add code to compile.
    /// Compiling code when C1 is running see the method <see cref="CodeGenerationManager.CompileRuntimeTempTypes"/>.
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)]
    public interface ICodeProvider
    {
        /// <summary>
        /// Add code namespaces and types and references you want to have compiled
        /// to the builder.
        /// </summary>
        /// <param name="builder"></param>
        void GetCodeToCompile(CodeGenerationBuilder builder);
    }
}
