using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel;
using System.Security.Permissions;
using System.Runtime;

namespace Composite.Core.NewIO
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [DefaultEvent("Changed"), System.IO.IODescription("FileSystemWatcherDesc"), PermissionSet(SecurityAction.LinkDemand, Name = "FullTrust"), PermissionSet(SecurityAction.InheritanceDemand, Name = "FullTrust")]
    public class FileSystemWatcher : Component, ISupportInitialize
    {
        private System.IO.FileSystemWatcher _fileSystemWatcher;

        [System.IO.IODescription("FSW_Changed")]
        public event System.IO.FileSystemEventHandler Changed 
        { 
            add 
            { 
                _fileSystemWatcher.Changed += value; 
            } 
            remove 
            { 
                _fileSystemWatcher.Changed -= value; 
            } 
        }



        [System.IO.IODescription("FSW_Created")]
        public event System.IO.FileSystemEventHandler Created
        {
            add
            {
                _fileSystemWatcher.Created += value;
            }
            remove
            {
                _fileSystemWatcher.Created -= value;
            }
        }



        [System.IO.IODescription("FSW_Deleted")]
        public event System.IO.FileSystemEventHandler Deleted
        {
            add
            {
                _fileSystemWatcher.Deleted += value;
            }
            remove
            {
                _fileSystemWatcher.Deleted -= value;
            }
        }



        //[Browsable(false)]
        //public event System.IO.ErrorEventHandler Error;
        
        
        [System.IO.IODescription("FSW_Renamed")]
        public event System.IO.RenamedEventHandler Renamed
        {
            add
            {
                _fileSystemWatcher.Renamed += value;
            }
            remove
            {
                _fileSystemWatcher.Renamed -= value;
            }
        }

        //// Methods
        //static FileSystemWatcher(){ throw new NotImplementedException(); }
        //public FileSystemWatcher(){ throw new NotImplementedException(); }
        //[TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
        
        public FileSystemWatcher(string path)
        {
            _fileSystemWatcher = new System.IO.FileSystemWatcher(path); 
        }
        
        public FileSystemWatcher(string path, string filter)
        {
            _fileSystemWatcher = new System.IO.FileSystemWatcher(path, filter); 
        }

        public void BeginInit()
        {
            _fileSystemWatcher.BeginInit(); 
        }
        
        
        public void EndInit()
        {
            _fileSystemWatcher.EndInit(); 
        }
        
        //[TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")]
        //public WaitForChangedResult WaitForChanged(System.IO.WatcherChangeTypes changeType){ throw new NotImplementedException(); }
        //public WaitForChangedResult WaitForChanged(System.IO.WatcherChangeTypes changeType, int timeout){ throw new NotImplementedException(); }

        //// Properties
        
        [System.IO.IODescription("FSW_Enabled"), DefaultValue(false)]
        public bool EnableRaisingEvents 
        { 
            [TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")] 
            get
            {
                return _fileSystemWatcher.EnableRaisingEvents; 
            } 
            set
            {
                _fileSystemWatcher.EnableRaisingEvents = value;
            } 
        }
        
        
        //[SettingsBindable(true), DefaultValue("*.*"), System.IO.IODescription("FSW_Filter"), TypeConverter("System.Diagnostics.Design.StringValueConverter, System.Design, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a")]
        //public string Filter { [TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")] get{ throw new NotImplementedException(); } set{ throw new NotImplementedException(); } }
        //[DefaultValue(false), System.IO.IODescription("FSW_IncludeSubdirectories")]
        
        public bool IncludeSubdirectories 
        { 
            [TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")] 
            get
            {
                return _fileSystemWatcher.IncludeSubdirectories; 
            } 
            set
            {
                _fileSystemWatcher.IncludeSubdirectories = value; 
            } 
        }
        
        //[DefaultValue(0x2000), Browsable(false)]
        //public int InternalBufferSize { [TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")] get{ throw new NotImplementedException(); } set{ throw new NotImplementedException(); } }
        
        [DefaultValue(0x13), System.IO.IODescription("FSW_ChangedFilter")]        
        public System.IO.NotifyFilters NotifyFilter 
        { 
            [TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")] 
            get
            {
                return _fileSystemWatcher.NotifyFilter; 
            } 
            set
            {
                _fileSystemWatcher.NotifyFilter = value;
            } 
        } 
        
        //[Editor("System.Diagnostics.Design.FSWPathEditor, System.Design, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a", "System.Drawing.Design.UITypeEditor, System.Drawing, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"), System.IO.IODescription("FSW_Path"), DefaultValue(""), TypeConverter("System.Diagnostics.Design.StringValueConverter, System.Design, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"), SettingsBindable(true)]
        //public string Path { [TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")] get{ throw new NotImplementedException(); } set{ throw new NotImplementedException(); } }
        //[Browsable(false)]
        //public override ISite Site { get{ throw new NotImplementedException(); } set{ throw new NotImplementedException(); } }
        //[DefaultValue((string)null), Browsable(false), System.IO.IODescription("FSW_SynchronizingObject")]
        //public ISynchronizeInvoke SynchronizingObject { get{ throw new NotImplementedException(); } [TargetedPatchingOptOut("Performance critical to inline this type of method across NGen image boundaries")] set{ throw new NotImplementedException(); } }        
    }
}
