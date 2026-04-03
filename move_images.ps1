$src = 'C:\Users\trinh\.gemini\antigravity\brain\03e0616c-8ad7-49da-9fd0-d630dac9f718'
$dest = 'D:\tuphap\khodldc\dldc_1\tailieu\tailieuphantich\images'

$files = @(
    @('dm_list_1_1774363290834.png', 'dm_list_1.png'),
    @('dm_detail_1_1774363300608.png', 'dm_detail_1.png'),
    @('dm_list_2_1774363324638.png', 'dm_list_2.png'),
    @('dm_detail_2_1774363334973.png', 'dm_detail_2.png'),
    @('dm_list_3_1774363365288.png', 'dm_list_3.png'),
    @('dm_detail_3_1774363377588.png', 'dm_detail_3.png'),
    @('dm_list_4_1774363401910.png', 'dm_list_4.png'),
    @('dm_detail_4_1774363414072.png', 'dm_detail_4.png'),
    @('dm_list_5_1774363448081.png', 'dm_list_5.png'),
    @('dm_detail_5_1774363460228.png', 'dm_detail_5.png'),
    @('dm_list_6_1774363488147.png', 'dm_list_6.png'),
    @('dm_detail_6_1774363498748.png', 'dm_detail_6.png'),
    @('dm_list_7_1774363522787.png', 'dm_list_7.png'),
    @('dm_detail_7_1774363534652.png', 'dm_detail_7.png'),
    @('dm_list_8_1774363557654.png', 'dm_list_8.png'),
    @('dm_detail_8_1774363568808.png', 'dm_detail_8.png'),
    @('bhxh_list_1_1774363611848.png', 'bhxh_list_1.png'),
    @('bhxh_detail_1_1774363624500.png', 'bhxh_detail_1.png'),
    @('bhxh_list_2_1774363651336.png', 'bhxh_list_2.png'),
    @('bhxh_detail_2_1774363662817.png', 'bhxh_detail_2.png'),
    @('bhxh_list_3_1774363754811.png', 'bhxh_list_3.png'),
    @('bhxh_detail_3_1774363767367.png', 'bhxh_detail_3.png'),
    @('bhxh_list_4_1774363793407.png', 'bhxh_list_4.png'),
    @('bhxh_detail_4_1774363805255.png', 'bhxh_detail_4.png'),
    @('bhxh_list_5_1774363840658.png', 'bhxh_list_5.png'),
    @('bhxh_detail_5_1774363848856.png', 'bhxh_detail_5.png'),
    @('bhxh_list_6_1774363886081.png', 'bhxh_list_6.png'),
    @('bhxh_detail_6_1774363899869.png', 'bhxh_detail_6.png'),
    @('bhxh_list_7_1774363927984.png', 'bhxh_list_7.png'),
    @('bhxh_detail_7_1774363941150.png', 'bhxh_detail_7.png'),
    @('ncc_list_1_1774363977040.png', 'ncc_list_1.png'),
    @('ncc_detail_1_1774363979689.png', 'ncc_detail_1.png'),
    @('ncc_list_2_1774364006500.png', 'ncc_list_2.png'),
    @('ncc_detail_2_1774364019103.png', 'ncc_detail_2.png'),
    @('ncc_list_3_1774364063237.png', 'ncc_list_3.png'),
    @('ncc_detail_3_1774364077253.png', 'ncc_detail_3.png')
)

foreach ($f in $files) {
    $s = Join-Path $src $f[0]
    $d = Join-Path $dest $f[1]
    Copy-Item -Path $s -Destination $d -Force
}
