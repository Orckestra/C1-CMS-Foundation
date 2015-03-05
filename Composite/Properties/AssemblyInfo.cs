using System.Reflection;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;


// General Information about an assembly is controlled through the following 
// set of attributes. Change these attribute values to modify the information
// associated with an assembly.

#if !InternalBuild
[assembly: AssemblyTitle("Composite C1 4.3 Beta 1")] 
#else
[assembly: AssemblyTitle("Composite C1 4.3 Beta 1 (Internal Build)")]
#endif

[assembly: AssemblyDescription("Composite C1 Core classes")]
[assembly: AssemblyConfiguration("")]
[assembly: AssemblyCompany("Composite A/S")]
[assembly: AssemblyProduct("Composite C1")]
[assembly: AssemblyCopyright("Copyright © Composite A/S 2015")]
[assembly: AssemblyTrademark("")]
[assembly: AssemblyCulture("")]

// Setting ComVisible to false makes the types in this assembly not visible 
// to COM components.  If you need to access a type in this assembly from 
// COM, set the ComVisible attribute to true on that type.
[assembly: ComVisible(false)]

// The following GUID is for the ID of the typelib if this project is exposed to COM
[assembly: Guid("c190c8d0-449f-42db-972d-0fc30f8c301d")]

// Version information for an assembly consists of the following four values:
//
//      Major Version
//      Minor Version 
//      Build Number
//      Revision
//
// You can specify all the values or you can default the Revision and Build Numbers 
// by using the '*' as shown below:

[assembly: AssemblyVersion("4.3.*")]

[assembly: InternalsVisibleTo("UpgradePackage")]
[assembly: InternalsVisibleTo("Composite.Workflows")]