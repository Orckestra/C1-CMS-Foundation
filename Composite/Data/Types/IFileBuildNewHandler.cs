using System;
using System.Linq;
using System.CodeDom;
using System.IO;
using Composite.Data.Foundation.CodeGeneration;
using Composite.Data.Streams;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Core.Types;
using System.Collections.Generic;


namespace Composite.Data.Types
{
    internal sealed class IFileBuildNewHandler : IBuildNewHandler
    {
        public Type GetTypeToBuild(Type dataType)
        {
#warning MRJ: BM: Rethink this !!
#warning MRJ: BM: CACHING!!
            CodeAttributeDeclaration codeAttributeDeclaration = new CodeAttributeDeclaration(
                new CodeTypeReference(typeof(FileStreamManagerAttribute)),
                new CodeAttributeArgument[] {
                    new CodeAttributeArgument(new CodeTypeOfExpression(typeof(IFileEmptyDataClassFileStreamManager)))
                });


            DataTypeDescriptor dataTypeDescriptor = DynamicTypes.DynamicTypeManager.GetDataTypeDescriptor(dataType);

            CodeGenerationBuilder codeGenerationBuilder = new CodeGenerationBuilder("IFileBuildNewHandler: " + dataType.FullName);

            CodeTypeDeclaration codeTypeDeclaration = EmptyDataClassCodeGenerator.CreateCodeTypeDeclaration(dataTypeDescriptor, typeof(IFileEmptyDataClassBase), codeAttributeDeclaration);
            
            CodeNamespace codeNamespace = new CodeNamespace("EmptyDataClassCodeGenerator.NamespaceName");
            codeNamespace.Types.Add(codeTypeDeclaration);

            codeGenerationBuilder.AddNamespace(codeNamespace);
            codeGenerationBuilder.AddReference(dataType.Assembly);
            codeGenerationBuilder.AddReference(typeof(IFileEmptyDataClassBase).Assembly);

            IEnumerable<Type> types = CodeGenerationManager.CompileRuntimeTempTypes(codeGenerationBuilder);

            string fullName = EmptyDataClassCodeGenerator.GetEmptyClassTypeFullName(dataTypeDescriptor);

            return types.Where(f => f.FullName == fullName).Single();
        }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class IFileEmptyDataClassBase : EmptyDataClassBase
    {
        private CachedMemoryStream _currentWriteStream;
        private Type _interfaceType;

        /// <exclude />
        public IFileEmptyDataClassBase()
        {
            _interfaceType = typeof(IFile);
        }


        /// <exclude />
        public CachedMemoryStream CurrentWriteStream
        {
            get { return _currentWriteStream; }
            set { _currentWriteStream = value; }
        }


        /// <exclude />
        protected override Type _InterfaceType
        {
            get { return _interfaceType; }
        }
    }




    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class IFileEmptyDataClassFileStreamManager : IFileStreamManager
    {
        /// <exclude />
        public Stream GetReadStream(IFile file)
        {
            IFileEmptyDataClassBase castedFile = (IFileEmptyDataClassBase)file;

            if (castedFile.CurrentWriteStream == null)
            {
                return new MemoryStream(new byte[] { });
            }
            else
            {
                return new MemoryStream(castedFile.CurrentWriteStream.Data);
            }
        }


        /// <exclude />
        public Stream GetNewWriteStream(IFile file)
        {
            IFileEmptyDataClassBase castedFile = (IFileEmptyDataClassBase)file;

            castedFile.CurrentWriteStream = new CachedMemoryStream();

            return castedFile.CurrentWriteStream;
        }


        /// <exclude />
        public void SubscribeOnFileChanged(IFile file, OnFileChangedDelegate handler)
        {
            // Do nothing...
        }
    }
}
