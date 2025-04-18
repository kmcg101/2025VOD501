/*********************************************************************************************************************
 *  Wednesday test KM
 * Change 2
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.                                           *
 *                                                                                                                    *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance    *
 *  with the License. A copy of the License is located at                                                             *
 *                                                                                                                    *
 *      http://www.apache.org/licenses/LICENSE-2.0                                                                    *
 *                                                                                                                    *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES *
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions    *
 *  and limitations under the License.                                                                                *
 *********************************************************************************************************************/
const verNumber = "501 km 002";
const { S3 } = require("@aws-sdk/client-s3");
const error = require("./lib/error.js");

exports.handler = async (event) => {
  console.log(`REQUEST:: ${JSON.stringify(event, null, 2)}`);

  const s3 = new S3();

  try {
    let params = {
      Bucket: event.srcBucket,
      Key: event.srcVideo,
      Tagging: {
        TagSet: [
          {
            Key: "guid",
            Value: event.guid,
          },
          {
            Key: process.env.AWS_LAMBDA_FUNCTION_NAME.slice(0, -15),
            Value: event.archiveSource,
          },
        ],
      },
    };

    await s3.putObjectTagging(params);
  } catch (err) {
    await error.handler(event, err);
    return err;
  }

  return event;
};
