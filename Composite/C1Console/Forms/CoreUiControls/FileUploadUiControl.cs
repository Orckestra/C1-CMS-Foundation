using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Composite.C1Console.Forms.Foundation;
using Composite.Core.Serialization;


namespace Composite.C1Console.Forms.CoreUiControls
{
    /// <summary>
    /// </summary>
    [ControlValueProperty("UploadedFile")]
    internal abstract class FileUploadUiControl : UiControl
    {
        /// <summary>
        /// </summary>
        [RequiredValue()]
        [BindableProperty]
        [FormsProperty()]
        public UploadedFile UploadedFile { get; set; }
    }


    internal sealed class UploadedFileSerializerHandler : ISerializerHandler
    {
        public string Serialize(object objectToSerialize)
        {
            if (objectToSerialize == null) throw new ArgumentNullException("objectToSerialize");

            StringBuilder sb = new StringBuilder();
            UploadedFile uploadedFile = (UploadedFile)objectToSerialize;

            StringConversionServices.SerializeKeyValuePair(sb, "HasFile", uploadedFile.HasFile);

            if (uploadedFile.FileName != null)
            {
                StringConversionServices.SerializeKeyValuePair(sb, "FileName", uploadedFile.FileName);
            }

            if (uploadedFile.ContentType != null)
            {
                StringConversionServices.SerializeKeyValuePair(sb, "ContentType", uploadedFile.ContentType);
            }

            StringConversionServices.SerializeKeyValuePair(sb, "ContentLength", uploadedFile.ContentLength);

            if (uploadedFile.FileStream != null)
            {
                long position = uploadedFile.FileStream.Position;

                uploadedFile.FileStream.Seek(0, SeekOrigin.Begin);
                
                byte[] buffer = new byte[uploadedFile.FileStream.Length];
                uploadedFile.FileStream.Read(buffer, 0, (int)uploadedFile.FileStream.Length);

                StringConversionServices.SerializeKeyValueArrayPair<byte>(sb, "FileStream", buffer);

                uploadedFile.FileStream.Seek(position, SeekOrigin.Begin);
            }

            return sb.ToString();
        }



        public object Deserialize(string serializedObject)
        {
            if (serializedObject == null) throw new ArgumentNullException("serializedObject");

            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(serializedObject);

            UploadedFile uploadedFile = new UploadedFile();

            if (dic.ContainsKey("HasFile") == false) throw new InvalidOperationException("Not correct serialized format");
            uploadedFile.HasFile = StringConversionServices.DeserializeValueBool(dic["HasFile"]);

            if (dic.ContainsKey("FileName") == true)
            {
                uploadedFile.FileName = StringConversionServices.DeserializeValueString(dic["FileName"]);
            }

            if (dic.ContainsKey("ContentType") == true)
            {
                uploadedFile.ContentType = StringConversionServices.DeserializeValueString(dic["ContentType"]);
            }

            if (dic.ContainsKey("ContentLength") == false) throw new InvalidOperationException("Not correct serialized format");
            uploadedFile.ContentLength = StringConversionServices.DeserializeValueInt(dic["ContentLength"]);

            if (dic.ContainsKey("FileStream") == true)
            {
                byte[] bytes = StringConversionServices.DeserializeValueArray<byte>(dic["FileStream"]);

                uploadedFile.FileStream = new MemoryStream(bytes);
            }

            return uploadedFile;
        }
    }


    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SerializerHandler(typeof(UploadedFileSerializerHandler))]
    public sealed class UploadedFile
    {
        /// <exclude />
        public UploadedFile()
        {
            this.HasFile = false;
        }

        /// <exclude />
        public bool HasFile { get; set; }

        /// <exclude />
        public string FileName { get; set; }

        /// <exclude />
        public string ContentType { get; set; }

        /// <exclude />
        public int ContentLength { get; set; }

        /// <exclude />
        public Stream FileStream { get; set; }
    }
}
