<table>
    <thead>
        <tr>
            <th colspan="5">User Skills Export</th>
        </tr>
        <tr>
            <th>Skill Name</th>
            <th>Category</th>
            <th>Level</th>
            <th>Status</th>
            <th>Selected</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($skills as $userSkill)
            <tr>
                <td>{{ $userSkill->skill->name }}</td>
                <td>{{ $userSkill->skill->category }}</td>
                <td>{{ $userSkill->level }}</td>
                <td>{{ $userSkill->status }}</td>
                <td>{{ $userSkill->is_selected ? 'Yes' : 'No' }}</td>
            </tr>
        @endforeach
    </tbody>

    <thead>
        <tr>
            <th colspan="6" style="padding-top: 20px;">Credentials</th>
        </tr>
        <tr>
            <th>Title</th>
            <th>Skill</th>
            <th>Type</th>
            <th>Issue Date</th>
            <th>Expiry Date</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($credentials as $credential)
            <tr>
                <td>{{ $credential->title }}</td>
                <td>{{ $credential->skill->name }}</td>
                <td>{{ $credential->type }}</td>
                <td>{{ $credential->issue_date }}</td>
                <td>{{ $credential->expiry_date }}</td>
                <td>{{ $credential->status }}</td>
            </tr>
        @endforeach
    </tbody>
</table>
