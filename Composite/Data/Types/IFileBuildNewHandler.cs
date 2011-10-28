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
using Composite.C1Console.Events;
using Composite.Data.Foundation;


namespace Composite.Data.Types
{
    internal static class FileBuildNewHandlerTypesManager
    {
        private static readonly object _lock = new object();
        private static Dictionary<Type, Type> _fileBuildNewHandlerTypes = new Dictionary<Type, Type>();
        
        
        static FileBuildNewHandlerTypesManager()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        internal static Type GetFileBuilderNewHandler(Type dataType)
        {
            Type result;
            if (!_fileBuildNewHandlerTypes.TryGetValue(dataType, out result))
            {
                lock(_lock)
                {
                    if (!_fileBuildNewHandlerTypes.TryGetValue(dataType, out result))
                    {
                        DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(dataType);

                        string fullName = EmptyDataClassCodeGenerator.GetEmptyClassTypeFullName(dataTypeDescriptor);

                        result = TypeManager.TryGetType(fullName);

                        if (result == null)
                        {
#warning MRJ: BM: Rethink this !!
#warning MRJ: BM: CACHING!!
                            CodeAttributeDeclaration codeAttributeDeclaration = new CodeAttributeDeclaration(
                                new CodeTypeReference(typeof(FileStreamManagerAttribute)),
                                new [] {
                                new CodeAttributeArgument(new CodeTypeOfExpression(typeof(IFileEmptyDataClassFileStreamManager)))
                            });


                            //CodeGenerationBuilder codeGenerationBuilder = new CodeGenerationBuilder("IFileBuildNewHandler: " + dataType.FullName);

                            //CodeTypeDeclaration codeTypeDeclaration = EmptyDataClassCodeGenerator.CreateCodeTypeDeclaration(dataTypeDescriptor, typeof(IFileEmptyDataClassBase), codeAttributeDeclaration);

                            //CodeNamespace codeNamespace = new CodeNamespace(EmptyDataClassCodeGenerator.NamespaceName);
                            //codeNamespace.Types.Add(codeTypeDeclaration);

                            result = EmptyDataClassTypeManager.CreateEmptyDataClassType(dataTypeDescriptor, typeof(IFileEmptyDataClassBase), codeAttributeDeclaration);
                            //codeGenerationBuilder.AddReference(typeof(System.ComponentModel.EditorBrowsableAttribute).Assembly);
                            //codeGenerationBuilder.AddNamespace(codeNamespace);
                            //codeGenerationBuilder.AddReference(dataType.Assembly);
                            //codeGenerationBuilder.AddReference(typeof(IFileEmptyDataClassBase).Assembly);

                            //IEnumerable<Type> types = CodeGenerationManager.CompileRuntimeTempTypes(codeGenerationBuilder);



                            //result = types.Where(f => f.FullName == fullName).Single();
                        }

                        _fileBuildNewHandlerTypes.Add(dataType, result);
                    }
                }         
            }

            return result;
        }
        



        private static void Flush()
        {
            _fileBuildNewHandlerTypes = new Dictionary<Type, Type>();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }
    }


    internal sealed class IFileBuildNewHandler : IBuildNewHandler
    {
        public Type GetTypeToBuild(Type dataType)
        {
           // DataTypeTypesManager.GetDataTypeEmptyClass()
            return FileBuildNewHandlerTypesManager.GetFileBuilderNewHandler(dataType);
        }


        public CodeAttributeDeclaration GetCodeAttributeDeclaration(Type dataType)
        {
            CodeAttributeDeclaration codeAttributeDeclaration = new CodeAttributeDeclaration(
                new CodeTypeReference(typeof(FileStreamManagerAttribute)),
                new [] {
                    new CodeAttributeArgument(new CodeTypeOfExpression(typeof(IFileEmptyDataClassFileStreamManager)))
                }
            );

            return codeAttributeDeclaration;
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
