using System;
using System.Reflection;
using System.Reflection.Emit;

namespace Composite.Plugins.Data.DataProviders.FileSystemDataProvider.Foundation
{
    internal static class FileSystemFileGenerator
    {
        internal static Type GenerateFileSystemFileWithInterface(Type interfaceType)
        {
            var asm = new AssemblyName(typeof(FileSystemFileGenerator).Name);

            AssemblyBuilder assemblyBuilder = AppDomain.CurrentDomain.DefineDynamicAssembly(asm, AssemblyBuilderAccess.Run);
            ModuleBuilder moduleBuilder = assemblyBuilder.DefineDynamicModule("MainModule");

            var typeSignature = typeof (FileSystemFileGenerator).Namespace + ".Generated." + interfaceType.FullName.Replace(".", "_");

            TypeBuilder tb = moduleBuilder.DefineType(typeSignature,
                TypeAttributes.Public |
                TypeAttributes.Class |
                TypeAttributes.AutoClass |
                TypeAttributes.AnsiClass |
                TypeAttributes.BeforeFieldInit |
                TypeAttributes.AutoLayout,
                typeof(FileSystemFile),
                new [] { interfaceType });

            return tb.CreateType();
        }
    }
}
