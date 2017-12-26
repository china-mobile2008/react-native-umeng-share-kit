using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Umeng.Share.Kit.RNUmengShareKit
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNUmengShareKitModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNUmengShareKitModule"/>.
        /// </summary>
        internal RNUmengShareKitModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNUmengShareKit";
            }
        }
    }
}
