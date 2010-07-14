using System;
using System.IO;
using System.CodeDom;

using Composite.Data.Streams;
using Composite.Data.Foundation.CodeGeneration;


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



    public class IFileEmptyDataClassBase : EmptyDataClassBase
    {
        private CachedMemoryStream _currentWriteStream;
        private Type _interfaceType;

        public IFileEmptyDataClassBase()
        {
            _interfaceType = typeof(IFile);
        }

        public CachedMemoryStream CurrentWriteStream
        {
            get { return _currentWriteStream; }
            set { _currentWriteStream = value; }
        }

        protected override Type _InterfaceType
        {
            get { return _interfaceType; }
        }
    }



    public sealed class IFileEmptyDataClassFileStreamManager : IFileStreamManager
    {
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

        public Stream GetNewWriteStream(IFile file)
        {
            IFileEmptyDataClassBase castedFile = (IFileEmptyDataClassBase)file;

            castedFile.CurrentWriteStream = new CachedMemoryStream();

            return castedFile.CurrentWriteStream;
        }

        public void SubscribeOnFileChanged(IFile file, OnFileChangedDelegate handler)
        {
            // Do nothing...
        }
    }
}
