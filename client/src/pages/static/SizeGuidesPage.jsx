import { Link } from "react-router-dom";
import StaticPageLayout from "../../components/static/StaticPageLayout";

function SizeGuidesPage() {
  return (
    <StaticPageLayout
      title="Size Guides"
      subtitle="Find your perfect fit before you order."
    >
      <h2>How to measure yourself</h2>
      <ul>
        <li>
          <strong>Chest:</strong> measure around the fullest part of your chest,
          keeping the tape level.
        </li>
        <li>
          <strong>Waist:</strong> measure around your natural waistline.
        </li>
        <li>
          <strong>Hip:</strong> measure around the fullest part of your hips.
        </li>
      </ul>

      <h2>Size chart (inches)</h2>
      <table>
        <thead>
          <tr>
            <th>Size</th>
            <th>Chest</th>
            <th>Waist</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>S</td>
            <td>34–36</td>
            <td>28–30</td>
          </tr>
          <tr>
            <td>M</td>
            <td>38–40</td>
            <td>32–34</td>
          </tr>
          <tr>
            <td>L</td>
            <td>42–44</td>
            <td>36–38</td>
          </tr>
          <tr>
            <td>XL</td>
            <td>46–48</td>
            <td>40–42</td>
          </tr>
          <tr>
            <td>XXL</td>
            <td>50–52</td>
            <td>44–46</td>
          </tr>
        </tbody>
      </table>

      <h2>Tips for the best fit</h2>
      <p>
        BYC sizing generally runs true to standard Nigerian retail sizing. If
        you're between two sizes, we recommend sizing up for boxers and singlets
        for a more comfortable, breathable fit.
      </p>

      <p>
        Still unsure? See individual product pages for item-specific
        measurements, or reach out via our{" "}
        <Link to="/contact" className="text-danger text-decoration-none">
          Contact page
        </Link>{" "}
        before ordering.
      </p>
    </StaticPageLayout>
  );
}

export default SizeGuidesPage;
