using System;
using System.CodeDom;
using System.IO;
using Composite.Data.Foundation.CodeGeneration;
using Composite.Data.Streams;


namespace Composite.Data.Types
{
    internal sealed class IFileBuildNewHandler : IBuildNewHandler
    {
        public Type GetTypeToBuild(Type dataType)
        {
            CodeAttributeDeclaration codeAttributeDeclaration = new CodeAttributeDeclaration(
                new CodeTypeReference(typeof(FileStreamManagerAttribute)),
                new CodeAttributeArgument[] {
                    new CodeAttributeArgument(new CodeTypeOfExpression(typeof(IFileEmptyDataClassFileStreamManager)))
                });

            return EmptyDataClassGenerator.CreateType(dataType, typeof(IFileEmptyDataClassBase), codeAttributeDeclaration);
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
