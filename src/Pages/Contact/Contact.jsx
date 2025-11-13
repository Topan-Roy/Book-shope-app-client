const Contact = () => {
  return (
    <div className="relative bg-gray-100">
      <div className="w-full mb-16 ">
        <img
          src="https://i.ibb.co.com/ksbX08FH/5b76f375-edac-47b2-8a46-e48c74b8d088-1024.jpg"
          className="bg-contain w-full h-[250px] "
          alt=""
        />
      </div>
      <div className="container mx-auto p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <h3 className="text-lg font-semibold mb-4">ONLINE INQUIRY</h3>
            <div className="space-y-4">
              <input
                placeholder="Name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 "
              />
              <input
                placeholder="Email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 "
              />
              <input
                placeholder="Phone"
                className="w-full border border-gray-300 rounded-md px-4 py-2 "
              />
              <select className="w-full border border-gray-300 rounded-md px-4 py-2 ">
                <option>Select An Interest</option>
              </select>
              <textarea
                placeholder="Message"
                className="w-full border border-gray-300 rounded-md px-4 py-2 h-24 "
              ></textarea>
              <button className="btn  btn-info bg-teal-600">S E N D</button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">CONTACT DETAILS</h3>
            <div className="space-y-4">
              <div className="text-gray-600">
                <a href="hrhridoyroy@gmail.com">roytopan734@gmail.com</a>
              </div>
              <div className="text-gray-600">(+088)01706541105</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Westfield</h4>
                  <p className="text-gray-600">
                    Bangladesh ,Dhaka <br />
                   Birgonj ,Dinajpur 
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Topan Roy</h4>
                  <p className="text-gray-600">
                    357 dinajpur Ave. <br />
                    PTI MOR, NJ 08535
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">PTI MOR Office</h4>
                  <p className="text-gray-600">
                    549 Millburn Ave. <br />
                   Ram nogor, NJ 07245
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
