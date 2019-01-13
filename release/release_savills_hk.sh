#!/bin/bash

# cp src/app/SavillsHK/bac.js src/app/SavillsHK/abc.js
# cd ios/
# mkdir -p release
# rm -r -f release/SavillsHK.xcarchive
# rm -r -f release/SavillsHK

# xmlstarlet ed --inplace -u "/Scheme/BuildAction/BuildActionEntries/BuildActionEntry/@buildForArchiving" -v "NO" Savills.xcworkspace/xcshareddata/xcschemes/Savills.xcscheme
# xmlstarlet ed --inplace -u "/Scheme/BuildAction/BuildActionEntries/BuildActionEntry[BuildableReference[@BlueprintName='React']]/@buildForArchiving" -v "YES" Savills.xcworkspace/xcshareddata/xcschemes/Savills.xcscheme

# xmlstarlet ed --inplace -u "/Scheme/BuildAction/BuildActionEntries/BuildActionEntry[BuildableReference[@BlueprintName='SavillsHK']]/@buildForArchiving" -v "YES" Savills.xcworkspace/xcshareddata/xcschemes/Savills.xcscheme
# xcodebuild clean -workspace Savills.xcworkspace -scheme SavillsHK archive -archivePath ./release/SavillsHK.xcarchive > ~/xcodebuild.log
# xcodebuild -exportArchive -archivePath ./release/SavillsHK.xcarchive -exportPath ./release/SavillsHK -exportOptionsPlist ./BuildPlist/store.plist
# xmlstarlet ed --inplace -u "/Scheme/BuildAction/BuildActionEntries/BuildActionEntry[BuildableReference[@BlueprintName='SavillsHK']]/@buildForArchiving" -v "NO" Savills.xcworkspace/xcshareddata/xcschemes/Savills.xcscheme



# xcodebuild clean -workspace Savills.xcworkspace -configuration Release -alltargets
# xcodebuild archive -workspace Savills.xcworkspace -scheme SavillsHK -archivePath ./release/SavillsHK.xcarchive
# xcodebuild -exportArchive -archivePath ./release/SavillsHK.xcarchive -exportPath ./release/SavillsHK -exportOptionsPlist ./BuildPlist/store.plist


# deploy to apple store

# xmlstarlet ed --inplace -u "/Scheme/BuildAction/BuildActionEntries/BuildActionEntry[BuildableReference[@BlueprintName='SavillsHK']]/@buildForArchiving" -v "YES"  Savills.xcworkspace/xcshareddata/xcschemes/Savills.xcscheme
# xcodebuild clean -workspace Savills.xcworkspace -scheme Savills archive -archivePath ./release/SavillsHK.xcarchive > ~/xcodebuild.log
# xcodebuild -exportArchive -archivePath  /Users/mac/Library/Developer/Xcode/Archives/2019-01-11/aaaa.xcarchive -exportPath ./release/SavillsHK -exportOptionsPlist ./BuildPlist/store.plist
# xmlstarlet ed --inplace -u "/Scheme/BuildAction/BuildActionEntries/BuildActionEntry[BuildableReference[@BlueprintName='SavillsHK']]/@buildForArchiving" -v "NO" Savills.xcworkspace/xcshareddata/xcschemes/Savills.xcscheme


# xmlstarlet ed --inplace -u "/Scheme/BuildAction/BuildActionEntries/BuildActionEntry[BuildableReference[@BlueprintName='SavillsHK']]/@buildForArchiving" -v "YES" Savills.xcworkspace/xcshareddata/xcschemes/Savills.xcscheme
# xcodebuild clean -workspace Savills.xcworkspace -scheme Savills archive -archivePath ./release/SavillsHK.xcarchive > ~/xcodebuild.log
# xcodebuild -exportArchive -archivePath ./release/SavillsHK.xcarchive -exportPath ./release/SavillsHK -exportOptionsPlist ./BuildPlist/store.plist
# xmlstarlet ed --inplace -u "/Scheme/BuildAction/BuildActionEntries/BuildActionEntry[BuildableReference[@BlueprintName='SavillsHK']]/@buildForArchiving" -v "NO" Savills.xcworkspace/xcshareddata/xcschemes/Savills.xcscheme
